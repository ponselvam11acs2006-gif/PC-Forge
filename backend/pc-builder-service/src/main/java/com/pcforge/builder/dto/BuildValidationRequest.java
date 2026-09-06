package com.pcforge.builder.dto;

import java.util.Map;

public class BuildValidationRequest {

    private Map<String, Object> cpu;
    private Map<String, Object> motherboard;
    private Map<String, Object> ram;
    private Map<String, Object> gpu;
    private Map<String, Object> storage;
    private Map<String, Object> psu;
    private Map<String, Object> cabinet;

    public Map<String, Object> getCpu() { return cpu; }
    public void setCpu(Map<String, Object> cpu) { this.cpu = cpu; }

    public Map<String, Object> getMotherboard() { return motherboard; }
    public void setMotherboard(Map<String, Object> motherboard) { this.motherboard = motherboard; }

    public Map<String, Object> getRam() { return ram; }
    public void setRam(Map<String, Object> ram) { this.ram = ram; }

    public Map<String, Object> getGpu() { return gpu; }
    public void setGpu(Map<String, Object> gpu) { this.gpu = gpu; }

    public Map<String, Object> getStorage() { return storage; }
    public void setStorage(Map<String, Object> storage) { this.storage = storage; }

    public Map<String, Object> getPsu() { return psu; }
    public void setPsu(Map<String, Object> psu) { this.psu = psu; }

    public Map<String, Object> getCabinet() { return cabinet; }
    public void setCabinet(Map<String, Object> cabinet) { this.cabinet = cabinet; }
}
